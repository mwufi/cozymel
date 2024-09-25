import Viewer from "@/components/Viewer";

export default function Page({ params }: { params: { pageId: string } }) {
  return <Viewer pageId={params.pageId} />
}