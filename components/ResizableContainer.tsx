import { Resizable } from 're-resizable';

function ResizableContainer({ children, width = 600 }: { children: React.ReactNode, width?: number }) {
  return (
    <Resizable defaultSize={{ width: width, height: 400 }}>
      {children}
    </Resizable>
  )
}

export default ResizableContainer;