import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// Image Viewer Plugin
import ImageViewer from '@miletorix/vitepress-image-viewer'
import '@miletorix/vitepress-image-viewer/style.css'

// ⬇️ DEIN Custom CSS
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        ImageViewer(app)
    }
} satisfies Theme
