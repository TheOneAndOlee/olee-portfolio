My new readme for my new portfolio website that got axed.

A lot of this project was to see how vibe-coding really worked, so I drafted my designs in Figma, and then told Copilot/Gemini what to do, and it turned out really well (I think)!

## Customize the interests bento grid

Edit `src/lib/data/interests.ts` to change the About page's interests. No component edits are needed.

### Grid settings

`interestGrid` controls the whole layout:

| Setting                                                 | Meaning                                                                                                                                                                                |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `desktop.size`                                          | Overall A × B grid: `width` columns × `height` minimum rows. Default: 5 × 3.                                                                                                           |
| `tablet.size`, `mobile.size`                            | Alternate dimensions for smaller containers. `height: 0` adds rows only as needed.                                                                                                     |
| `rowHeight` on each layout                              | `'square'` uses the column width as the minimum height; `'equal'` shares available height evenly; a CSS length such as `'10rem'` sets a minimum; `'auto'` follows content.             |
| `gap`                                                   | Space between tiles, e.g. `'1rem'` or `'12px'`.                                                                                                                                        |
| `radius`, `padding`                                     | Default tile corner radius and inner spacing.                                                                                                                                          |
| `borderWidth`                                           | Default border thickness, e.g. `'3px'`, `'0'` for no border, or `'0 0 3px'` for only a bottom border.                                                                                  |
| `background`, `textColor`, `accentColor`, `borderColor` | Default tile colors. Hex, CSS color functions, and theme variables are supported. Accent colors apply to titles in text-only tiles; anchored captions use `text.color` or `textColor`. |

The layouts respond to the **available grid width**, rather than the browser width: desktop above 44rem, tablet from above 28rem through 44rem, and mobile at 28rem or below. These two breakpoints are in `InterestBento.svelte` if you need to change them.

### Individual tiles

Each entry in `interests` controls one tile. `size: { width: A, height: B }` means **A squares wide × B squares tall**:

```ts
size: { width: 3, height: 1 }, // three squares across
tabletSize: { width: 2, height: 1 },
mobileSize: { width: 1, height: 1 },
background: '#d8e1cc',
textColor: '#263227',
accentColor: '#42573e',
borderColor: '#42573e',
borderWidth: '2px',
radius: '1rem',
padding: '1.5rem',
align: 'bottom'
```

- Use `1 × 1`, `2 × 1`, `1 × 3`, `3 × 2`, or any positive whole-number spans. Tile widths are clamped to the current column count so they cannot create extra columns.
- Optional `tabletSize` and `mobileSize` override spans at those layouts. If omitted, the width is clamped to fit and height resets to one row.
- Each tile can override any of the default colors, border width, radius, or padding. Remove an override to inherit the grid setting. Keep text/background pairs readable. The supplied design uses the website's theme variables, square corners, and 3px orange borders.
- Set `align` to `'top'`, `'center'`, or `'bottom'` to position the content vertically (default: top). Adding `text` or `image` enables corner placement instead; see below.
- Edit `title`, `description`, and `tags` for the content. Only `id`, `title`, and `size` are required.
- Add, remove, or reorder entries to change the interests. Give each tile a unique, stable `id`.

Tiles flow in array/reading order; they do not backfill earlier holes. Plan spans that fit the grid for a packed layout. `height` is a minimum, not a crop: extra tiles create more rows, and long text can increase row heights to stay readable. `'square'` preserves square units when the content fits. Mobile defaults to natural content height.

### Position tiles and build nested collages

Use `position: { column: 2, row: 1 }` to start a tile in column 2, row 1. Coordinates start at **1** within the tile's immediate parent grid. A tile sized `2 × 2` at that position fills the upper-right corner of a `3 × 3` grid.

Add `children` to turn any tile into a group with its own grid. Each child supports the same sizing, positioning, appearance, and further children. The parent title and description sit above its child grid. Parent and child dimensions are independent: a child `1 × 1` occupies one cell of the inner grid, not one cell of the outer grid.

```ts
{
  id: 'esports',
  title: 'E-sports',
  size: { width: 2, height: 2 },
  position: { column: 2, row: 1 },
  borderWidth: '3px',
  grid: {
    desktop: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
    tablet: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
    mobile: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
    gap: '0.5rem',
    padding: '0.75rem',
    borderWidth: '1px'
  },
  children: [
    {
      id: 'favorite-player',

      title: 'FNS', // Change to Neon whenever you like.
      description: 'Valorant',
      size: { width: 1, height: 1 },
      position: { column: 2, row: 1 },
      tabletPosition: { column: 2, row: 1 },
      mobilePosition: { column: 2, row: 1 },
      borderWidth: '2px' // Override this child's 1px grid default.
    }
  ]
}
```

- `grid` configures the **children**; the parent's own `size`, colors, padding, and border remain on the parent tile. Child appearance inherits from the parent, then `grid` overrides, then each child's overrides. Child-grid spacing inherits from the containing grid unless overridden.
- Without `grid` overrides, child grids use 2 × 2 equal rows on desktop/tablet and one content-sized column on mobile. The supplied E-sports group overrides mobile to retain a 2 × 2 collage. Its favorite-player tile is in the top-right on all layouts.
- Every grid responds to its **own** available width, including nested grids. A nested grid can use its mobile layout while the outer grid still uses desktop.
- Desktop `position` resets to automatic flow at smaller widths. Set `tabletPosition` / `mobilePosition` to place it explicitly there. Widths and column starts are clamped to fit.
- Avoid assigning overlapping cells to siblings: explicit positions are honored, including overlaps. Unpositioned siblings flow around reserved cells. Reading order remains the array order, so arrange it thoughtfully when setting visual positions.
- Set a group's `gap: '0'` for touching cells; adjust child borders (including per-side widths) if you want single shared dividers.

### Pictures and text in any corner

Child tiles use the same `image` option as parent tiles. The **PCs and Servers!** entry in `src/lib/data/interests.ts` includes two working examples using pictures in `static/bento-pics/`. Add a complete tile inside any `children` array:

```ts
{
  id: 'pc-photo',
  title: 'PC build',
  size: { width: 1, height: 1 },
  image: {
    src: '/bento-pics/pc_setup.jpg',
    alt: 'Desktop PC with its internal components visible',
    fit: 'cover',
    position: 'center',
    aspectRatio: '1 / 1'
  },
  text: { corner: 'bottom-left', placement: 'outside' }
}
```

Each child needs its own `id`, `title`, and `size`; its `image` needs both `src` and `alt`. Use `fit: 'contain'` to show the entire photo without cropping, or adjust `position` to choose the crop. Child images also support links and all eight caption positions below.

Add `image` to any tile, including nested tiles. Put your pictures in `static/` and use the URL **without** `static` (for example, `static/interests/fns.webp` becomes `/interests/fns.webp`). Public image URLs also work. The example below uses the headshot already in this project:

```ts
{
  id: 'portrait',
  title: 'Osmond Lee',
  size: { width: 1, height: 1 },
  image: {
    src: '/betterHeadshot.webp',
    alt: 'Osmond Lee headshot',
    fit: 'cover',
    position: 'center top',
    aspectRatio: '1 / 1'
  },
  text: {
    corner: 'bottom-right',
    placement: 'outside',
    gap: '0.5rem'
  }
}
```

All eight text placements are supported:

| `text.corner`    | `placement: 'inside'`               | `placement: 'outside'`         |
| ---------------- | ----------------------------------- | ------------------------------ |
| `'top-left'`     | Over the upper-left of the picture  | Above the frame, aligned left  |
| `'top-right'`    | Over the upper-right of the picture | Above the frame, aligned right |
| `'bottom-left'`  | Over the lower-left of the picture  | Below the frame, aligned left  |
| `'bottom-right'` | Over the lower-right of the picture | Below the frame, aligned right |

The title, description, and tags move together as one text block. Corner placement also works **without** an image. Omitting both `text` and `image` uses the text-only layout with the title at the top. Image tiles default to inside, bottom-left.

Image controls:

- `src` and `alt` are required. Use descriptive alt text, or `alt: ''` for a purely decorative image. Pictures load lazily.
- `fit: 'cover'` fills the frame and crops; `'contain'` shows the full picture against the tile background.
- `position` sets the focal point using CSS `object-position`, such as `'center'`, `'top'`, or `'70% 25%'`.
- `aspectRatio` sets the preferred frame shape (default `'1 / 1'`; try `'16 / 9'`). Grid sizing and long content can make the frame taller to keep everything readable.
- `overlay` optionally adds a color or gradient over the image, below the text, e.g. `'rgba(0, 0, 0, 0.35)'`.

Text controls:

- `corner` defaults to `'bottom-left'`; `placement` defaults to `'inside'`.
- `color` overrides the whole caption's text color. `background` and `padding` style the caption itself. Over-image captions default to the tile's background color with `0.75rem` padding for readability; outside captions default to transparent with no padding.
- For text directly over the photograph, use `background: 'transparent'`, `padding: '0'`, and a suitable `color`, with an image overlay if needed for contrast.
- The tile's existing `padding` sets the inset from the frame for inside text. `text.gap` sets the spacing outside the frame (default `0.5rem`). `text.maxWidth` can narrow the caption, e.g. `'75%'` or `'12rem'`; it is always constrained to fit the tile.
- Outside captions reserve space in the grid. They never float into a neighboring tile. The tile's `borderWidth`, `borderColor`, and `radius` apply to the picture frame, leaving the caption outside that border.
- Images and caption settings belong to the individual tile and are not inherited by children. A group can have its own image, caption, and child grid; inside top captions appear above the children, and bottom captions below them.

### Links and YouTube thumbnails

Add `link` to any tile or subtile. It works with text-only tiles, pictures, and all caption positions:

```ts
{
  id: 'resume-link',
  title: 'My resume',
  size: { width: 1, height: 1 },
  link: '/resume'
}
```

For a YouTube thumbnail, add `youtube.video` with a video URL or its 11-character ID. This example uses the video from [YouTube's API documentation](https://developers.google.com/youtube/iframe_api_reference); replace it with the video you want to feature:

```ts
{
  id: 'featured-video',
  title: 'Featured video',
  size: { width: 1, height: 1 },
  youtube: {
    video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
    showPlayIcon: true
  },
  text: { corner: 'bottom-left', placement: 'outside' }
}
```

- `youtube.video` accepts a bare video ID, `youtube.com/watch?v=...`, `youtu.be/...`, Shorts, live, and embed URLs. Video thumbnails and links are generated automatically, with a 16:9 preferred frame. Supported `t` / `start` timestamps carry over to the watch link.
- The thumbnail opens the video on YouTube; it does not embed or autoplay a player. No API key is needed. Channel and playlist URLs are regular `link` destinations, not video-thumbnail sources. Set a custom `image` for those.
- `youtube.showPlayIcon: false` hides the play marker. A tile's `image` overrides the generated thumbnail, so all existing image styling controls remain available. `link` overrides the generated video destination.
- A linked leaf tile is clickable across its frame and caption. For a group containing children, only its title links to the parent destination; each subtile keeps its own independent link. Keyboard users can tab to each link and activate it with Enter.
- External `http` / `https` links open in a new tab with `noopener noreferrer`. Internal root-relative paths, page fragments, query strings, `mailto:`, and `tel:` links default to the current tab. Override with `newTab: true` or `false`.
- Use `linkLabel` to supply a more descriptive accessible link name if the title alone is ambiguous.
- Invalid video IDs/URLs produce no automatic thumbnail or video link. Unsupported link schemes are ignored. Missing or unavailable YouTube thumbnails leave the caption and destination available; use a custom image if needed.
