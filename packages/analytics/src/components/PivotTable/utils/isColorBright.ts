const calculateColorBrightness = function (rgb: string | string[] | number[] | null) {
    if (!rgb) {
        return 0;
    }
    return Math.round(
        (parseInt(rgb[0] as string) * 299 +
            parseInt(rgb[1] as string) * 587 +
            parseInt(rgb[2] as string) * 114) /
        1000
    )
}

const isHex = (color: string | string[] | number[] | null) => {
    return typeof color === 'string' && color.charAt(0) === '#'
}

const hexToRgb = (hex: string | string[] | number[] | null) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : null
}

export const isColorBright = (color: string | string[] | number[] | null) => {
    if (isHex(color)) {
        color = hexToRgb(color)
    }

    return calculateColorBrightness(color) > 125
}
