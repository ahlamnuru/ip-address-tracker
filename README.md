# IP Address Tracker

This is my solution to the IP Address Tracker challenge from Frontend Mentor. When you open the page it shows your own IP address and where it is on a map, and you can also search any IP address or domain to see its location, timezone and internet provider. I built it with React, TypeScript and Tailwind, and my mentor asked us to use Zustand and TanStack Query for this project, so most of what I learned here is about how those two tools work together.

## What it does

As soon as the page opens, the app asks the IPify Geolocation API about the visitor's own IP address and shows the IP, the location, the timezone and the ISP in a white card, with a black pin on the map. You can type an IP address or a domain like github.com in the search bar and press the arrow button, and the card and the map update. If the search is not valid, a clear error message shows inside the card, and while the data is loading the card shows "Loading...". All the buttons and the input have hover and focus states, so you can use the whole app with only the keyboard. The layout changes for phone and desktop, with the four details stacked on small screens and in one row on big screens.

## What I used

I made the project with Vite and pnpm, and I wrote it with React and TypeScript. All the styling is Tailwind classes. The data comes from the IPify Geolocation API, the map is made with Leaflet and react-leaflet, and the map pictures come from OpenStreetMap. For the state I used Zustand for the search text and TanStack Query for the data from the API.

## What I learned

The most important thing for me was understanding why we use two tools. Zustand keeps what the user asked for, which is the search text, and TanStack Query keeps what the server answered, which is the location data. I learned not to copy the API answer into Zustand, because TanStack Query already remembers it. The search text is the key of the query, so every time it changes, Query fetches the new data by itself, and if I search the same IP again it shows the answer right away without calling the API again.

TanStack Query also gave me the loading and error states for free, so I did not have to write them by hand with useEffect. I used keepPreviousData so the card and the map do not go blank while a new search is loading, and I turned off retry and refetch on window focus because the free API has limited credits.

The map taught me something new too. The Leaflet map only reads the center and zoom one time when it is created, so I had to make a small component that uses useMap and setView to move the map every time the location changes. I also made my own marker with L.icon so I could use the pin from the design.

I also learned how environment variables work in Vite. The name must start with VITE_, the file must be called .env in the main folder, and I have to restart the dev server after I change it. I added .env to my .gitignore so my key does not go to GitHub.

## Problems I had

My first big problem was the missing API key message. The .env file did not exist, so I had to make it myself and restart the server. After that, my header was only a blue box and the search button had no arrow, because the images from the starter files were not in my public folder. I found a copy of the images in another GitHub repo, copied them into public/images, and fixed the file name for the pattern. I also got a long red error in the terminal because two files were missing, and I learned to read only the first error because the rest repeats it.

Another thing is that this is a project with no server, so my API key is inside the JavaScript and anyone can find it in the browser tools. It is fine for a practice challenge, but for a real project I would hide the key behind a small server.

## What I want to improve

I want to add a better loading look, like a skeleton, and the map style from the original design, because I used OpenStreetMap and it looks a little different. I also want to add tests, and a small history of my last searches.

## Run it on your computer

First get a free API key from geo.ipify.org. Then make a file called .env in the main folder with one line, with your own key after the equals sign and no spaces or quotes:

```
VITE_IPIFY_API_KEY=your_key_here
```

Then install the packages and start the dev server:

```bash
pnpm install
pnpm dev
```

## Links

Live site: add your link here

Solution on Frontend Mentor: add your link here

## Author

Ahlam Nuru, a full-stack web development student in Ethiopia. GitHub: https://github.com/ahlamnuru