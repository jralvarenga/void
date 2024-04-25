import ogs from 'open-graph-scraper'

export async function POST() {
  const res = await ogs({
    url: 'https://www.w3schools.com/howto/howto_css_form_icon.asp',
    customMetaTags: [{
      multiple: false, // is there more than one of these tags on a page (normally this is false)
      property: 'hostname', // meta tag name/property attribute
      fieldName: 'hostnameMetaTag', // name of the result variable
    }],

  })

  return Response.json(res.result)
}