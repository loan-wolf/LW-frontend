declare module 'react-jazzicon' {
  export function jsNumberForAddress(address: string): number

  declare const Jazzicon: React.ComponentType<{
    seed: number
    diameter: number
    paperStyles?: React.CSSProperties
    svgStyles?: React.CSSProperties
  }>

  export default Jazzicon
}
