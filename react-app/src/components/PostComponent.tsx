import type { Posts } from "../interfaces/IPosts"

export const PostComponent = ({ id, title, body }:Posts) => {
    return(
        <div key={id} className="posts">
            <div className="posts-title">
                {title}
            </div>
            <div className="posts-body">
                {body}
            </div>
        </div>
    )
}