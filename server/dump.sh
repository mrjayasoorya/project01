#!/bin/bash

FILE="/home/justdial/Downloads/datasets/archive (2)/flipkart_fashion_products_dataset.jsonl"
DB="ecommerce"
USER="postgres"
HOST="localhost"
PORT="5432"

while IFS= read -r line; do
  if [[ -z "$line" || "$line" =~ ^\s*$ ]]; then
    continue
  fi
  escaped_line=$(echo "$line" | sed "s/'/''/g")
  psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -c "
    INSERT INTO master_products (
      _id, actual_price, average_rating, brand, category, crawled_at, description, discount, 
      images, out_of_stock, pid, product_details, seller, selling_price, sub_category, title, url
    )
    SELECT
      (data->>'_id')::UUID,
      NULLIF(REPLACE((data->>'actual_price'), ',', ''), '')::NUMERIC,
      NULLIF((data->>'average_rating'), '')::NUMERIC,
      data->>'brand',
      data->>'category',
      TO_TIMESTAMP(data->>'crawled_at', 'MM/DD/YYYY, HH24:MI:SS')::TIMESTAMPTZ,
      data->>'description',
      data->>'discount',
      COALESCE((data->>'images')::JSONB, '[]'::JSONB),
      COALESCE((data->>'out_of_stock')::BOOLEAN, false),
      data->>'pid',
      COALESCE((data->>'product_details')::JSONB, '[]'::JSONB),
      data->>'seller',
      NULLIF(REPLACE((data->>'selling_price'), ',', ''), '')::NUMERIC,
      data->>'sub_category',
      data->>'title',
      data->>'url'
    FROM (SELECT '$escaped_line'::JSONB AS data) AS json_data
    ON CONFLICT DO NOTHING;
  "
done < "$FILE"

echo "Data insertion complete."