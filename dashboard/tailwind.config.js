module.exports = {
    important: true,
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            display: ['Niramit', 'Oswald'],
            body: ['Niramit', 'Oswald'],
            sans: ['Niramit', 'Sans-serif']
        },
        extend: {
            colors: {
                cyan: '#9cdbff',
            },
            margin: {
                '96': '24rem',
                '128': '32rem',
            },
        }
    },
    variants: {
        borderWidth: ['responsive', 'last', 'hover', 'focus'],
        textColor: ['responsive', 'hover', 'focus'],
        opacity: ['responsive', 'hover']
    }
}
