import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <button className="btn">
            <Link href="/">
                HOME
                </Link>
                <Link href="/post">
                POST
                </Link>
            </button>
        </nav>
    );
}