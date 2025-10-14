<script>

  import {Colors} from '$lib/assets/Colors.js';

  /**
   * The text to display inside the button.
   * @type {string}
   */
  export let text = "Button";
  /**
   * The source URL for an optional image.
   * @type {string}
   */
  
  export let href = "#";

  export let imgSrc = "";

  // svelte-ignore unused-export-let  
  export let textColor = Colors.WhiteText;

  // svelte-ignore unused-export-let  
  export let borderColor = Colors.ButtonGold;

  export let invert = 1.0;
</script>

<a 
  href= "{href}" target="_blank"
  class="glowing-btn" 
  style="--text-color: {textColor}; --border-color: {borderColor}; --invert: {invert};"
>
  <span class="border-span"></span>
  <span class="border-span"></span>
  <span class="border-span"></span>
  <span class="border-span"></span>
  {#if imgSrc}
    <img src={imgSrc} alt="" class="btn-icon" />
  {/if}
  <span>{text}</span>
</a>

<style>
  .glowing-btn {
    /* Positioning and base styles */
    position: relative;
    display: inline-flex; /* Use inline-flex for alignment */
    align-items: center; /* Center items vertically */
    gap: 10px; /* Add space between image and text */
    padding: 15px 30px;
    
    /* Typography */
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--text-color); /* Bright Purple */
    
    /* Appearance */
    background-color: transparent;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden; /* Crucial for containing the animation */
    
    /* Smooth transitions for hover effects */
    transition: all 0.3s ease;
  }

  .btn-icon {
    height: 1.2em; /* Set height relative to font size */
    width: auto;
    transition: filter 0.3s ease;
  }

  /* Invert icon color on hover for better contrast */
  .glowing-btn:hover .btn-icon {
    filter: invert(var(--invert));
  }

  .border-span {
    position: absolute;
    display: block;
  }
  
  /* --- Keyframe Animations for Infinite Loop --- */

  @keyframes animateTop {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes animateRight {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes animateBottom {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes animateLeft {
    0% { transform: translateY(100%); }
    100% { transform: translateY(-100%); }
  }


  /* --- Top Border Span --- */
  .border-span:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    transform: translateX(-100%);
  }

  .glowing-btn:hover .border-span:nth-child(1) {
    animation: animateTop 1s linear infinite;
  }

  /* --- Right Border Span --- */
  .border-span:nth-child(2) {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    transform: translateY(-100%);
  }
  
  .glowing-btn:hover .border-span:nth-child(2) {
    animation: animateRight 1s linear infinite;
    animation-delay: 0.25s; /* Start after the top border finishes */
  }
  
  /* --- Bottom Border Span --- */
  .border-span:nth-child(3) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    transform: translateX(100%);
  }
  
  .glowing-btn:hover .border-span:nth-child(3) {
    animation: animateBottom 1s linear infinite;
    animation-delay: 0.5s; /* Start after the right border finishes */
  }
  
  /* --- Left Border Span --- */
  .border-span:nth-child(4) {
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    transform: translateY(100%);
  }
  
  .glowing-btn:hover .border-span:nth-child(4) {
    animation: animateLeft 1s linear infinite;
    animation-delay: 0.75s; /* Start after the bottom border finishes */
  }
</style>