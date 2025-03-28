
import { Post } from '@/services/postService';

declare module '@/pages/Admin/Posts' {
  interface AdminPostsProps {
    onToggleFeature?: (post: Post) => void;
  }
  
  const AdminPosts: React.FC<AdminPostsProps>;
  export default AdminPosts;
}
