// generating custom UUID, crypto.UUID doesn't work over non https(for development mode)
let idCounter = 0;
export default function generateID() {
	return `id-${idCounter++}`
}