import React, { ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import * as DankMono from '../assets/fonts/DankMono-Italic.otf'
import * as DankMonoItalic from '../assets/fonts/DankMono-Italic.otf'

const Styles = createGlobalStyle`
  @font-face {
    font-family: 'Dank Mono';
    font-style: normal;
    src: local('Dank Mono'), local('DankMono'),
      url(${DankMono}),
      url(${DankMonoItalic})
  }

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* App-specific global styles */

html {
	background-color: #081518;
	min-height: 100vh;
}

body {
	position: relative;
	min-height: 100%;
	z-index: 1;
  box-sizing: 'border-box';
}

* {
  box-sizing: border-box;
	font-family: 'Dank Mono', monospace;
	color: #fffffa;
}
`
export const Background = styled.div`
  background-image: linear-gradient(to top right, #081518 20%, #020304);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
`

const RelativeContext = styled.div`
  position: relative;
  z-index: 1;
`

interface Props {
  children: ReactNode
}
const GlobalStyles = ({ children }: Props) => (
  <>
    <Styles />
    <Background />
    <RelativeContext>{children}</RelativeContext>
  </>
)

export default GlobalStyles
