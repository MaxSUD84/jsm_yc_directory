// Docs: https://www.sanity.io/docs/image-urls
export default function sanityLoader({ src, width, quality }) {
	const prj = 'zp7mbokg';
	const dataset = 'production';
	const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}${src}`);
	url.searchParams.set('auto', 'format');
	url.searchParams.set('fit', 'max');
	url.searchParams.set('w', width.toString());
	if (quality) {
		url.searchParams.set('q', quality.toString());
	}
	return url.href;
}
