// Disjoint sets
// Notion page: https://www.notion.so/Problem-Solving-373a6bf9c6254e7ebcdc6387d4771847#02fd797798994711b3d4be75edd6ae67
export class UnionFind {
	parents: Array<number>;
	constructor(numberOfVertices: number) {
		this.parents = new Array(numberOfVertices);
		for (let i = 0; i < numberOfVertices; i++) this.parents[i] = i;
	}

	// we use to find the parent
	find = (x: number, parents: Array<number>) => {
		while (x !== parents[x]) x = parents[x];
		return x;
	};

	// we use this to check if the two numbers are in the same
	// set/group or not
	union = (x: number, y: number, parents: Array<number>) => {
		const xRoot = this.find(x, parents);
		const yRoot = this.find(y, parents);
		// this means that x and y belong to the same group
		// also means that there's a cycle detected
		if (xRoot === yRoot) return true;

		// they don't belong to the same set/group
		// merge them
		parents[yRoot] = xRoot;
		return false;
	};
}
