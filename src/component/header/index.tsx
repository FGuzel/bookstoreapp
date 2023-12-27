'use client';
import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Search } from "../search";
import { Modal } from "../modal";

const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    };

    return (
        <header className={styles.header}>
            <Link href='/' className={styles.logo}>
                BOOKSTORE
            </Link>

            <button onClick={handleSearchOpen}>
                SEARCH
            </button>

            <Modal
                portalId="bookPreview"
                open={searchOpen}
                setOpen={setSearchOpen}
                title="Search"
            >
                <Search setIsOpen={setSearchOpen} />
            </Modal>
        </header>
    );
};

export default Header;