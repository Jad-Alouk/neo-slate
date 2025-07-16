import { CTA } from "@/components/Front-Page/CTA"
import { Features } from "@/components/Front-Page/Features"
import { Footer } from "@/components/Front-Page/Footer"
import { Header } from "@/components/Front-Page/Header"
import { Hero } from "@/components/Front-Page/Hero"
import { HowItWorks } from "@/components/Front-Page/HowItWorks"
import { Testimonials } from "@/components/Front-Page/Testimonials"


export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero />
				<Features />
				<HowItWorks />
				<Testimonials />
				<CTA />
			</main>
			<Footer />
		</div>
	)
}