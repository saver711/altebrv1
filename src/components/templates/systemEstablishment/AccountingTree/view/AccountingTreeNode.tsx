import { TreeNode } from "../../../../atoms/tree"
import { TreeNode_TP } from "./AccountingTreeData"

type AccountingTreeNode_TP = {
  tree: TreeNode_TP[]
}

export function AccountingTreeNode({ tree }: AccountingTreeNode_TP) {
  return (
    <>
      {tree.map((node, i) => (
        <TreeNode label={node.label} key={i}>
          {node.children && <AccountingTreeNode tree={node.children} />}
        </TreeNode>
      ))}
    </>
  )
}
