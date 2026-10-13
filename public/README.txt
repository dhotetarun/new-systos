Static assets go here (served from "/").

  public/logo (1).png   <- your footer logo (same file name as the original HTML used)

If the logo is missing, the footer shows the SVG cube logo instead, so nothing breaks.
Photo for the "anujsakore" card: add public/anuj.jpg and replace the "A" in
src/components/sections/Footer.jsx with <img src="/anuj.jpg" alt="anujsakore" />.
