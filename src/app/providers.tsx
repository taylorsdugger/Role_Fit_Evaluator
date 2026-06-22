'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return

    const init = () =>
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      })

    // Defer init until the browser is idle so analytics doesn't compete with
    // first paint / interactivity. Falls back to a microtask where unsupported.
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init)
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(init, 1)
    return () => clearTimeout(t)
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
