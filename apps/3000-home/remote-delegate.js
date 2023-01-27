import { importDelegatedModule } from '@module-federation/utilities';

module.exports = new Promise((resolve, reject) => {
  console.log('Delegate being called for', __resourceQuery);
  const currentRequest = new URLSearchParams(__resourceQuery).get('remote');

  const [global, url] = currentRequest.split('@');

  importDelegatedModule({
    global,
    url,
  })
    .then(async (remote) => {
      // remote.get('/.')

      console.log('custom hooks',await remote.get('./useCustomRemoteHook'));
      resolve(remote)
    })
    .catch((err) => reject(err));
});
