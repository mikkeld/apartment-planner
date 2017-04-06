import { AngularFireModule } from 'angularfire2';

const firebaseConfig = {
  apiKey: 'AIzaSyDsPhqcZa-_xAEpN0JL26ai-Z74OOb662I',
  authDomain: 'apartment-planner.firebaseapp.com',
  databaseURL: 'https://apartment-planner.firebaseio.com',
  storageBucket: 'apartment-planner.appspot.com'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig);

