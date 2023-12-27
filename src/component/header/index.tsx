import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link
                href='/'
                className={styles.logo}
            >
                BOOKSTORE
            </Link>

            <button>
                SEARCH
            </button>
        </header>
    );
};

export default Header;