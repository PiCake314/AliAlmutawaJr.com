import Link from "next/link"

export default function Header() {
  return (
    <div className="w-screen h-24 flex gap-40 justify-center items-center">
        <ul className="flex gap-10">
            <li>
                <Link href="/"> Home </Link>
            </li>
            <li>
                <a href="https://github.com/AliAlmutawaJr" target="_blank"> GitHub </a>
            </li>
            <li>
                <Link href="/blog"> Blog </Link>
            </li>
            <li>
                <a href="https://youtube.com/playlist?list=PLDHYmr2pTG4LUtPLCTp8MkSsHBAG-AJNs&si=OGTGeD5U5lcDpwbq" target="_blank">Talks</a>
            </li>
        </ul>
    </div>
  )
}
