import Link from "next/link"

export default function Header() {
  return (
    <div className="w-screen h-24 flex gap-40 justify-center items-center">
        <ul className="flex gap-10">
            <li>
                <a href="https://github.com/PiCake314" target="_blank">GitHub</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/ali-almutawa-jr-488bb1251/" target="_blank">LinkedIn</a>
            </li>
        </ul>
    </div>
  )
}
