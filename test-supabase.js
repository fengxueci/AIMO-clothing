const url = 'https://mgenhokimsvmauyitamd.supabase.co/storage/v1/object/designs/test.txt';
const apikey = 'sb_publishable_bMr36dTuhlABzZl6TEA4nw_rCG_Qgxq';

fetch(url, { 
  method: 'POST',
  headers: { 
    apikey, 
    Authorization: `Bearer ${apikey}`,
    'Content-Type': 'text/plain',
  },
  body: 'Hello World'
})
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Response:', text))
  .catch(err => console.error('Fetch Error:', err));
