import { MinHeap } from "../DataStrctures/Heap";

// Explanation in notion: https://www.notion.so/Problem-Solving-373a6bf9c6254e7ebcdc6387d4771847#1b63f51f28ed4ec8992cbdd17e93488b
export class Dijkstra {
	dijkstra = (
		// [from, to, distance]
		distances: Array<[number, number, number]>,
		n: number,
		start: number,
		end: number
	): number => {
		const startVertex = start;
		const startDistance = 0;

		// Map<source, Array<[destination, distance]>>
		const graph = new Map<number, Array<[number, number]>>();

		// heap is used to ensure we are always processing
		// the smallest path to some node
		const heap = new MinHeap(comparator);
		heap.enqueue([startVertex, startDistance]);

		// needed to see if we have already processed a node
		const visited = new Set<number>();

		// initialize graph
		for (let i = 1; i <= n; i++) graph.set(i, []);
		for (const [from, to, distance] of distances)
			graph.get(from).push([to, distance]);

		let totalMinimumDistance = 0;
		while (!heap.isEmpty()) {
			const [currentNode, smallestDistanceToCurrentNode] = heap.dequeue();

			if (currentNode === end) return smallestDistanceToCurrentNode;
			if (visited.has(currentNode)) continue;

			// We only add to visited set if we dequeue
			// element from stack (so we are currently on it)
			visited.add(currentNode);

			// this will always resemble the time taken
			// to visit all the nodes
			// It is also the time needed after traversing over
			// the last node because we are using a PQ
			totalMinimumDistance = smallestDistanceToCurrentNode;

			for (const [neighbor, distanceToNeighbor] of graph.get(currentNode))
				if (!visited.has(neighbor))
					heap.enqueue([
						neighbor,
						smallestDistanceToCurrentNode + distanceToNeighbor,
					]);
		}

		// if visited has all nodes (visited.size === n)
		// then we have found the shortest distance to visit all nodes
		// else we didn't visit all the nodes, so return -1
		return visited.size === n ? totalMinimumDistance : -1;

		// compare based on distance (I love this)
		function comparator([, distance]: [number, number]) {
			return distance;
		}
	};
}
