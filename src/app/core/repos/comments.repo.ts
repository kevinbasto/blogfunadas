import { Comment } from "../interfaces/comment.interface";

export interface CommentsRepo{
    createComment(location : string, comment : Comment) : Promise<any>;
    getComment(location : string, commentId : string)  : Promise<Comment>;
    updateComment(location : string, commentId : string, comment : Comment) : Promise<Comment>;
    deleteComment(location : string, commentId : string) : Promise<any>;
    getComments(pageSize : number, startAt : number, location : string) : Promise<any>;
}