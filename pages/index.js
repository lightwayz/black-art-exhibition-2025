import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState("Loading countdown...");

    useEffect(() => {
        function updateCountdown() {
            const eventDate = new Date("2025-09-27T09:00:00").getTime();
            const now = new Date().getTime();
            const diff = eventDate - now;

            if (diff <= 0) {
                setTimeLeft("🎉 The event is happening now!");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Head>
                <title>BLVCK Art Exhibition 2025 - Registration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

            </Head>

            <main>
                {/* ===== Header Section ===== */}
                <header className="hero" role="banner" aria-label="Event hero">
                    <div className="hero-content">
                        <h1>BLVCK Art Exhibition 2025 Registration</h1>
                    <p>
                        Welcome to the official registration for the Art Exhibition 2025!
                        This event brings together artists, collectors and art lovers to
                        celebrate creativity and expression.
                    </p>
                    <p>
                        Please fill out this form to confirm your participation either as an
                        exhibitor or guest. Your details will help us serve you better and
                        ensure you have the best experience at the exhibition.
                    </p>
                    <p>
                        Join us on <strong>September 27, 2025</strong> in Abuja, Nigeria!
                    </p>

                    {/* ✅ React countdown instead of scripts */}
                    <div id="countdown">{timeLeft}</div>

                    {/* ✅ Fixed link button */}
                    <Link href="/register" className="btn">
                        Register Now
                    </Link> </div>
                </header>

                {/* ===== Ticket Section ===== */}
                <section>
                    <h2 style={{ textAlign: "center" }}>🎟 Ticket</h2>
                    <div className="pricing" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="card" style={{ textAlign: "center" }}>
                            <p className="price">₦50,000</p>
                            <Image
                                src="/img/Logo-10[1].png"
                                alt="VIP Ticket"
                                width={200}
                                height={200}
                                className="ticket-img"
                            />

                            <button
                                className="btn"
                                onClick={() => {
                                    const ua = navigator.userAgent || navigator.vendor || window.opera;
                                    if (/android/i.test(ua)) {
                                        window.location.href = "intent://buyticket#Intent;scheme=energywallet;package=com.energywalletng;end";
                                    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
                                        window.location.href = "energywallet://buyticket";
                                        setTimeout(() => {
                                            window.location.href = "https://energywallet.ng/buyticket";
                                        }, 2000);
                                    } else {
                                        window.location.href = "https://energywallet.ng/buyticket";
                                    }
                                }}
                            >
                                🎟 Buy Voucher on Energywallet
                            </button>

                            <div className="google-play" style={{ marginTop: "10px" }}>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.energywalletng"
                                    target="_blank"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt="Get it on Google Play"
                                        style={{ maxWidth: "120px", height: "auto" }}
                                    />
                                </a>
                                <a
                                    href="https://apps.apple.com/us/app/energywallet/id6737345961"
                                    target="_blank"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                        alt="Download on the App Store"
                                        style={{ maxWidth: "120px", height: "auto" }}
                                    />
                                </a>
                            </div>

                            <p style={{ marginTop: "10px" }}>
                                Download <strong>Energywallet</strong> to buy your tickets easily!
                            </p>
                        </div>
                    </div>
                </section>


                {/* ===== Location Section ===== */}
                <section id="location" className="location-section">
                    <h2>📍 Event Location</h2>
                    <p>
                        The event will take place at{" "}
                        <strong>Tropic Galleria, Abuja, Nigeria</strong>.
                    </p>

                    <div style={{position: "relative", maxWidth: "1000px", margin: "0 auto"}}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.752345602915!2d7.4760849!3d9.0541746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b58a0032c29%3A0xf58f145d7f815d14!2sTropic%20Galleria!5e0!3m2!1sen!2sng!4v1726162947364!5m2!1sen!2sng"
                            width="100%"
                            height="400"
                            style={{ border: "0", borderRadius: "10px" }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>

                        <div style={{ textAlign: "center", marginTop: "15px" }}>
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Tropic+Galleria,+Abuja,+Nigeria"
                                target="_blank"
                                className="btn"
                            >
                                🚗 Get Directions
                            </a>
                        </div>
                    </div>
                </section>

                {/* ===== Footer ===== */}
                <footer>&copy; 2025 Black Art Exhibition. All rights reserved.</footer>
            </main>
        </>
    );
}
