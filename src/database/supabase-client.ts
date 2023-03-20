import { createClient } from '@supabase/supabase-js';

const bucketURL = 'https://uqepswrzhdalcfakmxxg.supabase.co';
const bucketKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZXBzd3J6aGRhbGNmYWtteHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTMyMjc5MSwiZXhwIjoxOTk0ODk4NzkxfQ.QoMt6EfubrclijbsLWoC5TZhFLAugPKIjCbc2lbBXdY';

export const supabase = createClient(bucketURL, bucketKey);

export const PROFILE_BUCKET_NAME = 'carpetsthumbs';
