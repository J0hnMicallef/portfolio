import { useState, useEffect } from 'react'
import { CONFIG } from '../config'

const GITHUB_API = 'https://api.github.com'
const cache = new Map()

async function fetchWithCache(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const data = await res.json()
  cache.set(url, data)
  return data
}

export function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const { username, perPage, excludeRepos } = CONFIG.github

    async function load() {
      try {
        setLoading(true)
        const data = await fetchWithCache(
          `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${perPage}&type=public`
        )
        const filtered = data
          .filter(r => !r.fork)
          .filter(r => !excludeRepos.includes(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(filtered)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { repos, loading, error }
}

export function useGithubProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const { username } = CONFIG.github

    async function load() {
      try {
        setLoading(true)
        const data = await fetchWithCache(`${GITHUB_API}/users/${username}`)
        setProfile(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { profile, loading, error }
}

export function useGithubLanguages(repoName) {
  const [languages, setLanguages] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!repoName) return
    const { username } = CONFIG.github

    async function load() {
      try {
        const data = await fetchWithCache(
          `${GITHUB_API}/repos/${username}/${repoName}/languages`
        )
        setLanguages(data)
      } catch {
        setLanguages({})
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [repoName])

  return { languages, loading }
}
