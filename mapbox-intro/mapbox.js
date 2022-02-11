// this is the feature branch

// https://www.mapbox.com/ -> register for an api key
console.log('mapbox')
mapboxgl.accessToken = 'your api key';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/jnrdmnn/ckl1aoosu0afb17r27yya1ti5', // style URL
	center: [13.4531823, 52.5331406], // starting position [lng, lat]
	zoom: 17 // starting zoom
});

const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')

// setting a popup

// const popup = new mapboxgl.Popup({
// 	closeButton: true
// })

// popup.setLngLat([13.4531823, 52.5331406])
// 	.setHTML('<h2>hello mapbox</h2>')
// 	.addTo(map)

map.on('click', addMarker)

const coords = [
	[13.405, 52.52],
	[13.6, 52.6]
]

coords.forEach(coord => {
	addMarker(coord)
})

function addMarker(coord) {
	new mapboxgl.Marker({
		color: 'red',
		draggable: true
	}).setLngLat(coord)
		.addTo(map)
		.on('dragend', event => console.log(event.target._lngLat))
}

// function addMarker(event) {
// 	const coords = event.lngLat
// 	console.log(coords)
// 	new mapboxgl.Marker({
// 		color: 'red',
// 		draggable: true
// 	}).setLngLat(coords)
// 		.addTo(map)
// 		.on('dragend', event => console.log(event.target._lngLat))
// }

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.4531823, 52.5331406])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))
