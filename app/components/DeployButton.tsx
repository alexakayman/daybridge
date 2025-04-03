export default function DeployButton() {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fdaybridge&project-name=daybridge&repository-name=daybridge&demo-title=DayBridge&demo-description=A%20modern%20financial%20health%20and%20analytics%20platform%20built%20with%20Next.js%2C%20Prisma%2C%20and%20Plaid.&demo-url=https%3A%2F%2Fdaybridge.vercel.app"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        aria-label="Vercel logomark"
        role="img"
        viewBox="0 0 74 64"
        className="h-4 w-4 mr-2"
      >
        <path
          d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
          fill="currentColor"
        ></path>
      </svg>
      Deploy to Vercel
    </a>
  );
}
