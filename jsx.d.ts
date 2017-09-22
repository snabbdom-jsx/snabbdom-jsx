import { VNode, VNodeData } from 'snabbdom/vnode'

/* 
    These global typings are needed by Typescript for TSX support
    and used by Typescript for JSX tag completion. They are based
    on equivalent typings in react.
 */
 

declare global {
    namespace JSX {
    
        type Element = VNode

        // Based on the tag list in github:DefinitelyTyped/DefinitelyTyped:React
        interface IntrinsicElements {
            // HTML
            a: VNodeData;
            abbr: VNodeData;
            address: VNodeData;
            area: VNodeData;
            article: VNodeData;
            aside: VNodeData;
            audio: VNodeData;
            b: VNodeData;
            base: VNodeData;
            bdi: VNodeData;
            bdo: VNodeData;
            big: VNodeData;
            blockquote: VNodeData;
            body: VNodeData;
            br: VNodeData;
            button: VNodeData;
            canvas: VNodeData;
            caption: VNodeData;
            cite: VNodeData;
            code: VNodeData;
            col: VNodeData;
            colgroup: VNodeData;
            data: VNodeData;
            datalist: VNodeData;
            dd: VNodeData;
            del: VNodeData;
            details: VNodeData;
            dfn: VNodeData;
            dialog: VNodeData;
            div: VNodeData;
            dl: VNodeData;
            dt: VNodeData;
            em: VNodeData;
            embed: VNodeData;
            fieldset: VNodeData;
            figcaption: VNodeData;
            figure: VNodeData;
            footer: VNodeData;
            form: VNodeData;
            h1: VNodeData;
            h2: VNodeData;
            h3: VNodeData;
            h4: VNodeData;
            h5: VNodeData;
            h6: VNodeData;
            head: VNodeData;
            header: VNodeData;
            hr: VNodeData;
            html: VNodeData;
            i: VNodeData;
            iframe: VNodeData;
            img: VNodeData;
            input: VNodeData;
            ins: VNodeData;
            kbd: VNodeData;
            keygen: VNodeData;
            label: VNodeData;
            legend: VNodeData;
            li: VNodeData;
            link: VNodeData;
            main: VNodeData;
            map: VNodeData;
            mark: VNodeData;
            menu: VNodeData;
            menuitem: VNodeData;
            meta: VNodeData;
            meter: VNodeData;
            nav: VNodeData;
            noscript: VNodeData;
            object: VNodeData;
            ol: VNodeData;
            optgroup: VNodeData;
            option: VNodeData;
            output: VNodeData;
            p: VNodeData;
            param: VNodeData;
            picture: VNodeData;
            pre: VNodeData;
            progress: VNodeData;
            q: VNodeData;
            rp: VNodeData;
            rt: VNodeData;
            ruby: VNodeData;
            s: VNodeData;
            samp: VNodeData;
            script: VNodeData;
            section: VNodeData;
            select: VNodeData;
            small: VNodeData;
            source: VNodeData;
            span: VNodeData;
            strong: VNodeData;
            style: VNodeData;
            sub: VNodeData;
            summary: VNodeData;
            sup: VNodeData;
            table: VNodeData;
            tbody: VNodeData;
            td: VNodeData;
            textarea: VNodeData;
            tfoot: VNodeData;
            th: VNodeData;
            thead: VNodeData;
            time: VNodeData;
            title: VNodeData;
            tr: VNodeData;
            track: VNodeData;
            u: VNodeData;
            ul: VNodeData;
            "var": VNodeData;
            video: VNodeData;
            wbr: VNodeData;

            [elemName: string]: any // catch-all for now
        }
    }
}
