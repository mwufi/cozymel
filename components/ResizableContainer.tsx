import { Resizable } from 're-resizable';

function ResizableContainer({ children }: { children: React.ReactNode }) {
  return (
    <Resizable defaultSize={{ width: 600, height: 400 }}>
      {children}
    </Resizable>
  )
}

export default ResizableContainer;