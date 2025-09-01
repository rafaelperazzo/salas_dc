import camelot
import pandas as pd

tables = camelot.read_pdf("salas.pdf",pages='all')
all_dfs = [table.df for table in tables]
combined_df = pd.concat(all_dfs, ignore_index=True)
print(combined_df)

combined_df.to_csv("salas.csv", index=False)