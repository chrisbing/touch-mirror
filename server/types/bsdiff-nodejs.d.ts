declare module 'bsdiff-nodejs' {
    export function diff(oldFile: string, newFile: string, patchFile: string): Promise<any>

    export function patch(oldFile: string, generatedFile: string, patchFile: string): Promise<any>
}
