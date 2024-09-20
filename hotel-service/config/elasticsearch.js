import { Client } from '@elastic/elasticsearch';
import Hotel from '../models/Hotel.js'; 


const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://elasticsearch-service:9200' }); 


export async function createHotelIndex() {
  try {
    const indexExists = await esClient.indices.exists({ index: 'hotels' });

    if (indexExists.body) {
      console.log('Hotels index already exists');
      return;
    }

    await esClient.indices.create({
      index: 'hotels',
      body: {
        settings: {
          analysis: {
            filter: {
              edge_ngram_filter: {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 10
              },
              
            },
            analyzer: {
              edge_ngram_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                filter: ['lowercase', 'edge_ngram_filter'] 
              }
            }
          }
        },
        mappings: {
          properties: {
            name: {
              type: 'text',
              analyzer: 'edge_ngram_analyzer'
            },
            city: {
              type: 'text',
              analyzer: 'edge_ngram_analyzer'
            },
            country: {
              type: 'text',
              analyzer: 'edge_ngram_analyzer'
            }
          }
        }
      }
    });

    console.log('Hotels index successfully created with edge_ngram filter');
  } catch (error) {
    console.error('Error creating hotels index:', error);
  }
}



export async function syncHotelsToElasticsearch() {
  try {

    const hotels = await Hotel.find({}, 'name city country'); 

    if (!hotels.length) {
      console.log('No hotels found in the database');
      return;
    }

 
    for (const hotel of hotels) {
      await esClient.index({
        index: 'hotels',
        id: hotel._id.toString(),
        body: {
          name: hotel.name,
          city: hotel.city,
          country: hotel.country
        }
      });
      console.log(`Hotel ${hotel.name} added to Elasticsearch`);
    }

    console.log('All hotel data has been successfully synced to Elasticsearch');
  } catch (error) {
    console.error('Error syncing hotels to Elasticsearch:', error);
  }
}


(async () => {
  await createHotelIndex();
  await syncHotelsToElasticsearch(); 
})();

export default esClient;
