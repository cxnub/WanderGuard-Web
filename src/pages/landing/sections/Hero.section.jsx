import { useRef } from "react"
import "./Hero.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();
    const dynamicWords = useRef(null);
    const firstWord = useRef(null);

    const resetWords = (dynamicWordsElement) => {
        dynamicWordsElement.animate([{
            transform: `translateY(0)`
        }], {
            delay: 0,
            duration: 0,
            fill: "forwards"
        });
    }

    const cycleWords = (index) => {
        const dynamicWordsElement = dynamicWords.current;
        const dynamicWordsChildren = dynamicWordsElement.children;

        let currentIndex = index || 0;
        let isLastWord = currentIndex === dynamicWordsChildren.length - 2;
        let currentAnim;
        let animPercentage = (currentIndex + 1) / dynamicWordsChildren.length * 100;

        const cycleWord = [
            {
                transform: `translateY(-${animPercentage}%)`
            }
        ];

        currentAnim = dynamicWordsElement.animate(cycleWord, {
            duration: 500,
            delay: 2000,
            fill: "forwards"
        });

        const nextCycle = () => {
            if (isLastWord) {
                currentIndex = 0;
                resetWords(dynamicWordsElement);
            } else {
                currentIndex++;
            }

            dynamicWordsElement.style.width = `${dynamicWordsChildren[currentIndex].offsetWidth}px`;
            cycleWords(currentIndex);
        }

        currentAnim.onfinish = nextCycle;
    }

    useEffect(() => {
        dynamicWords.current.style.width = `140px`;
        cycleWords();
    });

    return <section className="container-fluid hero-section d-flex flex-column justify-content-center align-items-center py-5">
        <h1 className="text-center">
            <span className="first-line">Empowering Caregivers, Ensuring</span>
            <span className="second-line">
                <div className="animation">
                    <div className="d-flex flex-column dynamic-words" ref={dynamicWords}>
                        <span className="dynamic-word fw-bold pe-2" ref={firstWord}>Safety</span>
                        <span className="dynamic-word fw-bold pe-2">Comfort</span>
                        <span className="dynamic-word fw-bold pe-2">Well-being</span>
                        <span className="dynamic-word fw-bold pe-2">Safety</span>
                    </div>
                </div>
                for Dementia Patients
            </span>
        </h1>
        <p className="lead mt-3 text-center">
            Monitor your loved ones in real-time, receive wandering alerts, and ensure their safety with WanderGuard AI.
        </p>
        <button onClick={() => navigate("/register")} className="btn btn-primary btn-lg mt-4 fw-bold get-started">Get Started</button>
        <img className="img-fluid" src='hero.png'></img>
    </section>
}