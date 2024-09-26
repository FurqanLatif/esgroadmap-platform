SELECT
  `esgroadmap`.`companydata`.`company` AS `company`,
  `esgroadmap`.`companydata`.`Member of the S&P500` AS `Member of the S&P500`,
  `esgroadmap`.`companydata`.`Member of the Russell 1000 Index` AS `Member of the Russell 1000 Index`,
  `esgroadmap`.`companydata`.`Ticker(s)` AS `Ticker(s)`,
  `esgroadmap`.`companydata`.`PR Agency` AS `PR Agency`,
  `esgroadmap`.`companydata`.`Example 2020 company PR agency press release URL` AS `Example 2020 company PR agency press release URL`,
  `esgroadmap`.`companydata`.`Company Global / Main Website URL` AS `Company Global / Main Website URL`,
  `esgroadmap`.`companydata`.`Company global/main press - news release site URL` AS `Company global/main press - news release site URL`,
  `esgroadmap`.`companydata`.`Company annual reports page URL` AS `Company annual reports page URL`,
  `esgroadmap`.`companydata`.`Company annual / financial report 2020 URL of pdf document` AS `Company annual / financial report 2020 URL of pdf document`,
  `esgroadmap`.`companydata`.`Company sustainability / ESG reports page URL` AS `Company sustainability / ESG reports page URL`,
  `esgroadmap`.`companydata`.`Company Sustainability / ESG report 2020 URL of pdf document` AS `Company Sustainability / ESG report 2020 URL of pdf document`,
  `esgroadmap`.`companydata`.`Country` AS `Country`,
  `esgroadmap`.`companydata`.`sector code #1 (NAICS)` AS `sector code #1 (NAICS)`,
  `esgroadmap`.`companydata`.`sector name #1 (NAICS)` AS `sector name #1 (NAICS)`,
  `esgroadmap`.`companydata`.`sector code #2 (NAICS)` AS `sector code #2 (NAICS)`,
  `esgroadmap`.`companydata`.`sector name #2 (NAICS)` AS `sector name #2 (NAICS)`,
  `esgroadmap`.`companydata`.`sector code #3 (NAICS)` AS `sector code #3 (NAICS)`,
  `esgroadmap`.`companydata`.`sector name #3 (NAICS)` AS `sector name #3 (NAICS)`,
  `esgroadmap`.`companydata`.`sector code #4 (NAICS)` AS `sector code #4 (NAICS)`,
  `esgroadmap`.`companydata`.`sector name #4 (NAICS)` AS `sector name #4 (NAICS)`,
  `esgroadmap`.`companydata`.`sector code #5 (NAICS)` AS `sector code #5 (NAICS)`,
  `esgroadmap`.`companydata`.`sector name #5 (NAICS)` AS `sector name #5 (NAICS)`,
  `esgroadmap`.`companydata`.`sector codes all (NAICS)` AS `sector codes all (NAICS)`,
  `esgroadmap`.`companydata`.`sector name all (NAICS)` AS `sector name all (NAICS)`
FROM
  `esgroadmap`.`companydata`