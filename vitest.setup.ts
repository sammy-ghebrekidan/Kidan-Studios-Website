import '@testing-library/jest-dom/vitest'

// Provide dummy Sanity env so the client can initialize during tests.
// Components import a shared client that requires a projectId at module load.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||= 'test'
process.env.NEXT_PUBLIC_SANITY_DATASET ||= 'production'
