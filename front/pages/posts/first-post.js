import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <img src="/images/Screenshot from 2021-07-16 10-45-49.png" alt="screen shot"  />
    </>
  )
}