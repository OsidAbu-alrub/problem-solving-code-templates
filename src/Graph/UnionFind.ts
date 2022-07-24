// Disjoint sets
// Notion page: https://www.notion.so/Problem-Solving-373a6bf9c6254e7ebcdc6387d4771847#02fd797798994711b3d4be75edd6ae67
export class UnionFind {
	parents: Array<number>;
	constructor(numberOfVertices: number) {
		this.parents = new Array(numberOfVertices);
		for (let i = 0; i < numberOfVertices; i++) this.parents[i] = i;
	}

	// this function returns the parent of city
	findParent = (node: number, parents: Array<number>) => {
		// iterate until you reach absolute root
		while (node !== parents[node]) node = parents[node];
		return node;
	};

	// function that merges sets/groups/graphs if not in same set
	// if they are already in the same set, then no change is made
	union = (
		representative: number,
		follower: number,
		parents: Array<number>
	) => {
		// find absolute parents of representative and follower
		let representativeRoot = this.findParent(representative, parents);
		let followerRoot = this.findParent(follower, parents);

		// this means they are in the same set/group/graph
		if (representativeRoot === followerRoot) return true;

		// false means that they weren't in the same
		// same set, thus we need to merge them
		// xRoot is representative of yRoot
		parents[followerRoot] = representativeRoot;
		return false;
	};
}
