import { createRoot } from 'react-dom/client'
import Content from './content'

const container = document.getElementById('root')

// eslint-disable-next-line
const app = createRoot(container!)

app.render(<Content />)
