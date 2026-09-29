# FrenyTech App Builder

Build a complete, production-ready application called FrenyTech Web2APK Builder.



This must be a REAL working application, not a mockup, fake demo, or simulated APK generator.



The application should be professionally branded around FrenyTech and should help strengthen the FrenyTech brand and discoverability.



---



1. BRAND IDENTITY



Brand name:



FrenyTech



Product name:



FrenyTech Web2APK Builder



GitHub username:



frenytech



WhatsApp contact:



09048564527



Use FrenyTech naturally throughout the application.



Examples:



- FrenyTech Web2APK Builder

- Built by FrenyTech

- More developer tools by FrenyTech

- FrenyTech Developer Tools

- © FrenyTech



Do NOT make the site look like an advertisement. The branding should feel like a legitimate professional developer platform.



Where appropriate, include a subtle:



Built with ❤️ by FrenyTech



and a footer link to the FrenyTech GitHub profile using:



https://github.com/frenytech



Also provide a WhatsApp contact/action using the supplied WhatsApp number where appropriate.



Do not expose unnecessary personal information elsewhere on the site.



---



2. CORE PURPOSE



Create a professional web application that allows users to convert a website into an Android APK through the Web2APK API.



The user should be able to:



1. Enter website URL

2. Enter app name

3. Enter Android package name

4. Enter version name

5. Enter version code

6. Enter icon URL

7. Click Build APK

8. See the real build process state

9. Wait for the real API response

10. Receive the generated "downloadUrl"

11. Download the generated APK

12. Copy the download URL

13. Build another APK



Do NOT hard-code any generated download URL.



---



3. WEB2APK API



Use:



POST



https://web2apk.benfeitech.com/api/build



Request:



Content-Type: application/json



Example:



{

"websiteUrl": "https://example.com",

"appName": "My App",

"packageName": "com.example.myapp",

"versionName": "1.0.0",

"versionCode": "1",

"iconUrl": "https://example.com/icon.png"

}



The API can return something similar to:



{

"success": true,

"message": "APK built successfully!",

"buildTime": 89086,

"downloadUrl": "https://webappcreator.amethystlab.org/download/..."

}



The actual "downloadUrl" must ALWAYS be obtained dynamically from the current API response.



Never hard-code:



https://webappcreator.amethystlab.org/download/e06b9fef-04f9-4678-8201-63a5...



That was only an example generated from a previous build.



---



4. CRITICAL API SECURITY



Do NOT expose the raw API response or unnecessary API implementation details to the browser.



The user must NEVER see raw JSON as the primary interface.



Use a secure server-side architecture:



USER

↓

FrenyTech frontend

↓

FrenyTech server-side API route

↓

Web2APK API

↓

FrenyTech server receives response

↓

Server validates/filters response

↓

Frontend receives only the safe data required by the UI



The server-side route should extract only the fields the frontend actually needs.



For example:



{

"success": true,

"message": "APK built successfully!",

"buildTime": 89086,

"downloadUrl": "..."

}



Then return a clean application-specific response to the frontend.



Never display the upstream API's raw JSON.



If the upstream API returns additional fields, do not automatically forward all of them to the client.



Only expose the minimum required information.



---



5. SECRETS



Never place API secrets in:



- React components

- client-side JavaScript

- HTML

- public configuration

- GitHub

- screenshots

- browser localStorage

- VITE_* variables if they contain secrets



If the Web2APK service requires an API key or authentication in the future, use a server-side environment variable.



Example:



WEB2APK_API_KEY



Never commit it to GitHub.



Create a ".env.example" file containing placeholder variable names only.



---



6. SUPABASE — IMPORTANT



DO NOT require Supabase for the basic Web2APK generation functionality.



The core builder should work without Supabase.



I only want Supabase if I later choose features such as:



- user accounts

- authentication

- saved builds

- build history

- user quotas

- subscriptions

- payment records

- admin dashboard

- usage analytics



If any of those features are implemented, STOP and ask me to connect/provide my OWN Supabase project.



Do NOT automatically use Lovable Cloud as my permanent backend.



Do NOT invent Supabase credentials.



When Supabase is needed, ask me for:



- Supabase project URL

- Supabase publishable/anon key



Use secure RLS policies.



---



7. MAIN BUILDER



Create a premium builder interface with:



Website URL

App Name

Package Name

Version Name

Version Code

Icon URL



Defaults:



Version Name:

1.0.0



Version Code:

1



Validate every field properly.



Package name should follow Android package naming conventions.



Show icon preview when possible.



---



8. BUILD BUTTON



Primary button:



Build APK



When clicked:



- Validate fields

- Send request to the secure server-side route

- Show a real building state

- Do not fake completion

- Wait for the actual response

- Process the returned "downloadUrl"



The API can take a significant amount of time.



Do not use an unrealistically short timeout.



---



9. BUILDING EXPERIENCE



Create a polished progress interface.



Example states:



Preparing build

→

Sending configuration

→

Building Android application

→

Finalizing APK

→

Build complete



Do NOT claim a stage has completed unless appropriate.



Do NOT create fake percentage progress.



Make it clear that the application is waiting for the actual server response.



---



10. SUCCESS CARD



When:



success === true



display:



APK Built Successfully ✓



Show:



- App Name

- Package Name

- Version

- Build Time



Then:



Download APK



Copy Download URL



Build Another



The Download button MUST use:



"downloadUrl"



from the current API response.



Never use a hard-coded URL.



---



11. DO NOT DISPLAY RAW JSON



This is extremely important.



Never show something like:



{

"success": true,

"message": "...",

"downloadUrl": "..."

}



as the normal result.



Instead convert the response into a professional UI:



┌──────────────────────────────┐

│ ✓ APK Built Successfully     │

│                              │

│ Stream Account               │

│ Version 1.0.0                │

│ Build time: 89 seconds       │

│                              │

│ [ Download APK ]             │

│ [ Copy Download URL ]        │

└──────────────────────────────┘



If debugging is needed during development, keep technical information behind a developer-only/debug mechanism and never make raw API JSON part of the normal user experience.



---



12. ERROR HANDLING



Handle:



- Invalid website URL

- Missing fields

- Invalid package name

- Invalid version code

- API errors

- HTTP errors

- Network errors

- Timeout

- Invalid JSON

- "success: false"

- Missing "downloadUrl"

- Server errors



Give users clear messages.



Do not expose internal stack traces, secrets, API credentials, or unnecessary backend information.



---



13. FREN YTECH BRAND PROMOTION



Make FrenyTech discoverable without keyword stuffing.



Use appropriate branding in:



- Page title

- Header

- Hero

- Footer

- About/help content

- Open Graph metadata

- WebSite structured data

- README

- GitHub links



Example title:



FrenyTech Web2APK Builder — Convert Websites to Android Apps



Example description:



FrenyTech Web2APK Builder is a developer-focused tool for converting websites into Android applications through a streamlined APK build workflow.



Use semantic content naturally.



Do NOT spam "FrenyTech" repeatedly.



---



14. HERO



Create a professional hero section.



Eyebrow:



FRENYTECH DEVELOPER TOOLS



Heading:



Turn Your Website Into an Android App



Supporting text:



Create Android APK builds from your website with the FrenyTech Web2APK Builder.



Buttons:



Build Your APK



How It Works



Add a subtle developer/Android visual.



Avoid excessive animations.



---



15. HEADER



Header should contain:



- FrenyTech logo

- Web2APK Builder

- How It Works

- Documentation/Help

- Build APK



On mobile use a proper responsive navigation menu.



---



16. FREN YTECH FOOTER



Create a professional footer containing:



FrenyTech



"Developer tools built by FrenyTech."



Links:



- Home

- Web2APK Builder

- GitHub

- WhatsApp

- Privacy

- Terms



GitHub:



https://github.com/frenytech



WhatsApp:



https://wa.me/2349048564527



Do not display the raw phone number as the primary CTA if a WhatsApp button can be used.



---



17. FAVICON — IMPORTANT



Create a NEW professional favicon specifically for the FrenyTech brand.



It must be:



- Original

- Clean

- Professional

- Recognizable at 16×16 and 32×32

- Compatible with the site's visual identity

- Suitable for a developer/security/software brand

- Properly fitted inside the favicon canvas

- Integrated into HTML metadata



Use a design that works with the FrenyTech branding.



Do NOT use:



- Lovable favicon

- Vite favicon

- React favicon

- Generic globe favicon

- Random emoji

- Unrelated stock icon



Generate the favicon as part of the project and make sure all default builder/framework favicon references are removed.



Include appropriate:



- favicon

- apple-touch-icon

- manifest icons where applicable



---



18. SEO



Implement complete technical SEO.



Include:



- Unique title

- Meta description

- Canonical URL

- Open Graph metadata

- Twitter/X metadata

- Semantic headings

- "robots.txt"

- "sitemap.xml"

- WebSite JSON-LD

- Organization JSON-LD where appropriate

- SoftwareApplication/WebApplication structured data where appropriate

- Favicon metadata

- HTTPS canonical consistency



Use FrenyTech as the intended brand/site name.



Do not accidentally add "noindex" to public pages.



Prepare the site for Google Search Console.



Use a configurable production canonical domain.



---



19. SECURITY HEADERS



Where supported by the deployment architecture, configure appropriate security headers such as:



- Content-Security-Policy

- X-Content-Type-Options

- Referrer-Policy

- Permissions-Policy

- Strict-Transport-Security for HTTPS production



Do not create a CSP that breaks the actual application.



Test the resulting application after applying security headers.



---



20. RESPONSIVE DESIGN



The entire application must work properly on:



- Android

- iPhone

- Tablet

- Laptop

- Desktop



The mobile experience must be intentionally designed rather than simply shrinking desktop elements.



---



21. TECHNOLOGY



Use:



- React

- TypeScript

- Tailwind CSS

- Reusable components

- Server-side API route

- Proper TypeScript types

- Secure environment variables



Separate:



- API service

- validation

- components

- types

- utilities

- pages



Do not create one giant component.



Do not use "any" unnecessarily.



---



22. VERCEL COMPATIBILITY



The application must be ready for Vercel deployment.



Check:



- Production build

- Server-side API routes

- Environment variables

- No localhost URLs

- No development-only configuration

- Correct SPA routing

- Direct URL refreshes

- HTTPS

- SEO files

- Favicon

- Security headers



Do not make the application dependent on Lovable preview.



---



23. GITHUB



Prepare the project for GitHub under:



frenytech



Do not automatically push or modify my GitHub account unless I explicitly authorize the required connection.



Create a clean repository-ready structure.



Include:



- README.md

- ".gitignore"

- ".env.example"



Never commit:



- API keys

- Supabase secrets

- private credentials

- production secrets

- generated sensitive files



---



24. README.md



Create a complete professional README.



Include:



- FrenyTech branding

- Project overview

- Features

- Architecture

- Tech stack

- Installation

- Development

- Environment variables

- Web2APK API integration

- API request example

- API response example

- Security architecture

- Why the raw JSON is not exposed

- Dynamic download URL handling

- Supabase optional configuration

- Vercel deployment

- GitHub deployment

- SEO

- Favicon

- Troubleshooting

- Future improvements



Clearly explain:



The "downloadUrl" is generated dynamically by the Web2APK service and must never be hard-coded.



---



25. PERFORMANCE



Optimize for:



- Fast initial load

- Mobile performance

- Core Web Vitals

- Optimized images

- Minimal unnecessary JavaScript

- Lazy loading where appropriate

- Lightweight animations



---



26. ACCESSIBILITY



Implement:



- Proper labels

- Keyboard navigation

- Focus states

- Semantic HTML

- Accessible buttons

- Accessible validation errors

- Appropriate ARIA attributes



---



27. FINAL SECURITY CHECK



Before completing the project verify:



✓ No API secret in frontend

✓ No raw API JSON displayed

✓ No hard-coded download URL

✓ "downloadUrl" comes from current API response

✓ API errors don't expose internal details

✓ ".env" is ignored

✓ ".env.example" contains placeholders only

✓ No Supabase credentials are invented

✓ No default Lovable branding

✓ No default Vite/React favicon

✓ Proper FrenyTech favicon

✓ HTTPS-ready

✓ Vercel-ready

✓ GitHub-ready



---



28. FINAL FUNCTIONAL TEST



Test the complete flow:



1. Open FrenyTech Web2APK Builder

2. Enter website information

3. Validate fields

4. Click Build APK

5. Confirm the request reaches the backend route

6. Confirm backend communicates with Web2APK API

7. Wait for the real response

8. Confirm "success: true"

9. Extract "downloadUrl"

10. Display a polished success card

11. Confirm Download APK opens the returned URL

12. Confirm Copy URL copies the returned URL

13. Confirm no raw API JSON is displayed

14. Test API failure

15. Test timeout

16. Test missing download URL

17. Test mobile layout

18. Test desktop layout

19. Test production build

20. Test SEO

21. Test favicon

22. Test Vercel deployment behavior



---



29. IMPORTANT: ASK ME FOR REQUIRED CONFIGURATION



Before assuming credentials or external services, tell me exactly what configuration is required.



For the basic Web2APK builder, DO NOT require Supabase unless there is a genuine feature requiring it.



If Supabase becomes necessary, ask me to connect my own Supabase project.



If a Web2APK API secret is required, ask me to provide it through a secure environment-variable configuration.



For GitHub integration, identify the GitHub account as:



frenytech



Do not invent credentials or tokens.



---



30. FINAL PRODUCT STANDARD



The finished result should feel like a real product from a professional developer brand:



FrenyTech Web2APK Builder



It should be:



- Professional

- Fast

- Secure

- Mobile responsive

- Production-ready

- Vercel-compatible

- SEO-ready

- GitHub-ready

- Properly branded

- Easy to understand

- Easy to use



Most importantly:



Do not build a fake demo. Connect the real Web2APK API and dynamically process its real response.



The generated APK download URL must come from the API response for each individual build.



Never hard-code it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/47dfc4cb-ef3d-4d3f-bd04-463c3f95dcbc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
