const Package = require('../core/Package')
const Liquid = require('../core/Liquid')
const FS = require('../support/FS')
const Pages = require('./Pages')

describe('Pages', () => {
  it('works', async () => {
    const liquid = new Liquid({
      fs: FS.mock([
        {
          path: '/myPackage/pages/index.js',
          content: `
              export default () => <h1>Index</h1>
            `,
        },
        {
          path: '/myPackage/pages/about-me.js',
          content: `
          export default () => <h1>About me</h1>
            `,
        },
        {
          path: '/myPackage/pages/about-me/profile.js',
          content: `
          export default () => <h1>Profile</h1>
            `,
        },
      ]),
    })

    const pages = new Pages(liquid)

    const pkg = new Package(liquid, '/myPackage', { name: 'myPackage' })

    await pages.run(pkg)

    expect(pages._pages[0].name).toEqual('Index')
    expect(pages._pages[0].path).toEqual(/^\/$/)
    expect(pages._pages[0].component).toEqual('/myPackage/pages/index.js')

    expect(pages._pages[1].name).toEqual('AboutMe')
    expect(pages._pages[1].path).toEqual(/^\/about-me\/?$/)
    expect(pages._pages[1].component).toEqual('/myPackage/pages/about-me.js')

    expect(pages._pages[2].name).toEqual('AboutMeProfile')
    expect(pages._pages[2].path).toEqual(/^\/about-me\/profile\/?$/)
    expect(pages._pages[2].component).toEqual('/myPackage/pages/about-me/profile.js')
  })

  it('supports 404 page', async () => {
    const liquid = new Liquid({
      fs: FS.mock([
        {
          path: '/myPackage/pages/_404.js',
          content: `
            export default () => <h1>404</h1>
            `,
        },
        {
          path: '/myPackage/pages/index.js',
          content: `
          export default () => <h1>Index</h1>
            `,
        },
      ]),
    })

    const pages = new Pages(liquid)

    const pkg = new Package(liquid, '/myPackage', { name: 'myPackage' })

    await pages.run(pkg)

    expect(pages._pages[0].name).toEqual('Index')
    expect(pages._pages[0].path).toEqual(/^\/$/)
    expect(pages._pages[0].component).toEqual('/myPackage/pages/index.js')

    expect(pages._pages[1].name).toEqual('_404')
    expect(pages._pages[1].path).toEqual(/^\/.*$/)
    expect(pages._pages[1].component).toEqual('/myPackage/pages/_404.js')
  })

  it('supports fallback page', async () => {
    const liquid = new Liquid({
      fs: FS.mock([
        {
          path: '/myPackage/pages/_.js',
          content: `
            export default () => <h1>Fallback</h1>
            `,
        },
        {
          path: '/myPackage/pages/index.js',
          content: `
          export default () => <h1>Index</h1>
            `,
        },
      ]),
    })

    const pages = new Pages(liquid)

    const pkg = new Package(liquid, '/myPackage', { name: 'myPackage' })

    await pages.run(pkg)

    expect(pages._pages[0].name).toEqual('Index')
    expect(pages._pages[0].path).toEqual(/^\/$/)
    expect(pages._pages[0].component).toEqual('/myPackage/pages/index.js')

    expect(pages._pages[1].name).toEqual('_')
    expect(pages._pages[1].path).toEqual(/^\/.*$/)
    expect(pages._pages[1].component).toEqual('/myPackage/pages/_.js')
  })
})
