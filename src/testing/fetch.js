export const getData = async () => {
  try {
    const resp = await fetch('/api/products/')
    // console.log(resp)

    return resp.json()
  } catch (error) {
    console.log(error)
  }
}
