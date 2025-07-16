export default function Docs() {
    return (
        <div className="docsContainer" id="docs">
            <h1 id="neoslate-documentation">neoSlate Documentation</h1>

            <p id="docsP"><strong>A lightweight, user-friendly CMS for everyone</strong></p>

            <div className="toc">
                <h2 id="table-of-contents">Table of Contents</h2>
                <ul id="docsUL">
                    <li><a id="docsLink" href="#introduction">Introduction</a></li>
                    <li><a id="docsLink" href="#getting-started">Getting Started</a></li>
                    <li><a id="docsLink" href="#project-types">Project Types</a>
                        <ul id="docsUL">
                            <li><a id="docsLink" href="#blog">Blog</a></li>
                            <li><a id="docsLink" href="#portfolio">Portfolio</a></li>
                            <li><a id="docsLink" href="#product-page">Product Page</a></li>
                        </ul>
                    </li>
                    <li><a id="docsLink" href="#customization-options">Customization Options</a></li>
                    <li><a id="docsLink" href="#frequently-asked-questions">Frequently Asked Questions</a></li>
                    <li><a id="docsLink" href="#support">Support</a></li>
                </ul>
            </div>

            <h2 id="introduction">Introduction</h2>

            <p id="docsP">Welcome to neoSlate, a simple and lightweight Content Management System (CMS) designed for students, small start-ups, local businesses, and individuals who want to establish an online presence without any technical knowledge.</p>

            <p id="docsP">neoSlate is built with simplicity in mind, making it incredibly easy to create and publish your content online. Whether you need a professional blog, an impressive portfolio, or a product showcase, neoSlate has you covered—all for free, with no hidden costs or limitations.</p>

            <h3 id="who-is-neoslate-for">Who is neoSlate for?</h3>

            <ul id="docsUL">
                <li>Students wanting to showcase their work</li>
                <li>Blog writers seeking a simple publishing platform</li>
                <li>Small business owners needing an online presence</li>
                <li>Individuals selling products who need a simple showcase</li>
                <li>Anyone without programming knowledge who wants to publish content online</li>
            </ul>

            <h2 id="getting-started">Getting Started</h2>

            <p id="docsP">Getting started with neoSlate is quick and easy:</p>

            <ol id="docsOL">
                <li>Visit <a id="docsLink" href="https://neo-slate.vercel.app/">https://neo-slate.vercel.app/</a></li>
                <li>{`Click on "Sign Up" or "Get Started"`}</li>
                <li>Choose your preferred authentication method:
                    <ul id="docsUL">
                        <li>Google Account</li>
                        <li>Facebook Account</li>
                        <li>GitHub Account</li>
                    </ul>
                </li>
                <li>{`Once authenticated, you'll be directed to the dashboard`}</li>
                <li>Select the type of project you want to create (Blog, Portfolio, or Product Page...)</li>
                <li>Fill out the required information</li>
                <li>{`Click "Create" and your project will be live instantly!`}</li>
            </ol>

            <p id="docsP">{`No installations, downloads, or technical setup required—it's that simple!`}</p>

            <h2 id="project-types">Project Types</h2>

            <p id="docsP">neoSlate currently offers three project types to meet your needs:</p>

            <h3 id="blog">Blog</h3>

            <p id="docsP">Perfect for sharing your thoughts, ideas, tutorials, or news. The blog feature allows you to:</p>
            <ul id="docsUL">
                <li>Write and publish articles easily</li>
                <li>Organize content chronologically</li>
                <li>Choose from 6 specialized templates:
                    <ul id="docsUL">
                        <li>{`Professional -> best for Professional/Business category`}</li>
                        <li>{`Social -> best for Social/News category`}</li>
                        <li>{`Card -> best for Technology category`}</li>
                        <li>{`Magazine -> best for Art category`}</li>
                        <li>{`Clean -> best for Science category`}</li>
                        <li>{`Energetic -> best for Sports category`}</li>
                    </ul>
                </li>
            </ul>

            <h3 id="portfolio">Portfolio</h3>

            <p id="docsP">Showcase your work, skills, and achievements with a professional portfolio. Choose from three distinctive templates:</p>
            <ul id="docsUL">
                <li>Modern: A contemporary design with bold elements</li>
                <li>Minimal: A clean, simple layout that lets your work shine</li>
                <li>Timeline: A chronological display of your projects and experiences</li>
            </ul>

            <h3 id="product-page">Product Page</h3>

            <p id="docsP">Highlight your product or service with a dedicated page that includes:</p>
            <ul id="docsUL">
                <li>Product images</li>
                <li>Detailed descriptions</li>
                <li>Key features and benefits</li>
            </ul>

            <h2 id="customization-options">Customization Options</h2>

            <p id="docsP">Even though neoSlate is designed for simplicity, it still offers plenty of customization options:</p>

            <h3 id="blog-customization">Blog Customization</h3>
            <ul id="docsUL">
                <li>Choose different font types for titles and body text</li>
                <li>Select from 6 specialized templates</li>
                <li>Upload a featured image for your blog topic</li>
                <li>Organize content in your preferred structure</li>
            </ul>

            <h3 id="portfolio-customization">Portfolio Customization</h3>
            <ul id="docsUL">
                <li>Select from three distinctive templates (Modern, Minimal, Timeline)</li>
                <li>Upload your profile photo</li>
                <li>Showcase your projects with images and descriptions</li>
                <li>Highlight your skills and achievements</li>
            </ul>

            <h3 id="product-page-customization">Product Page Customization</h3>
            <ul id="docsUL">
                <li>Upload product images</li>
                <li>Add detailed descriptions</li>
                <li>Showcase key features and benefits</li>
            </ul>

            <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>

            <p id="docsP"><strong>Q: Is neoSlate really free?</strong><br />
                A: Yes! neoSlate is completely free with no paid tiers or hidden costs. You get unlimited storage and pages.</p>

            <p id="docsP"><strong>Q: Do I need to know how to code to use neoSlate?</strong><br />
                A: Not at all! neoSlate is specifically designed for users with no programming knowledge.</p>

            <p id="docsP"><strong>Q: How secure is my data?</strong><br />
                {`A: neoSlate prioritizes your privacy. We don't store any personal information beyond what's necessary for authentication through Google, Facebook, or GitHub.`}</p>

            <p id="docsP"><strong>Q: Can I change my project type after creation?</strong><br />
                {`A: Currently, you'll need to create a new project if you want to change project types.`}</p>

            <p id="docsP"><strong>Q: Are there any limits to how much I can publish?</strong><br />
                {`A: No, you can publish as much content as you'd like without any restrictions.`}</p>

            <h2 id="support">Support</h2>

            <p id="docsP">While neoSlate is designed to be intuitive and easy to use, we understand you might have questions. Currently, support options are being developed, including:</p>

            <ul id="docsUL">
                <li>A comprehensive user guide (coming soon)</li>
                <li>Live demo examples (coming soon)</li>
                <li>Support email (planned for future implementation)</li>
            </ul>

            <p id="docsP">In the meantime, the interface is designed to be self-explanatory with helpful tooltips and instructions throughout the platform.</p>

            <div className="footer">
                <p id="docsP">neoSlate - Simplifying online presence for everyone</p>
            </div>
        </div>
    )
}