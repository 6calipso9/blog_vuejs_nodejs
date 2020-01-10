

        public void writeIDsPosts()
        {
            // //*[@id="create-post-form"]/table/tbody/tr[1]/td[1]
            IWebElement PostTable = driver.FindElement(By.XPath("/html/body/div/div[2]/div[2]/div[2]/div[2]/table/tbody"));
            IList<IWebElement> TablRows = PostTable.FindElements(By.TagName("tr"));
            int rows_count = TablRows.Count;
            Console.WriteLine($"Count posts: {rows_count}");
            for (int i = 0; i < rows_count; i++)
            {
                IWebElement id_post = TablRows[i].FindElement(By.TagName("th"));
                string cont = id_post.Text;
                Console.WriteLine($"ID_POST positions: {cont}");

            }
        }



[assembly: System.Reflection.AssemblyCompanyAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyConfigurationAttribute("Debug")]
[assembly: System.Reflection.AssemblyFileVersionAttribute("1.0.0.0")]
[assembly: System.Reflection.AssemblyInformationalVersionAttribute("1.0.0")]
[assembly: System.Reflection.AssemblyProductAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyTitleAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyVersionAttribute("1.0.0.0")]


[assembly: System.Reflection.AssemblyCompanyAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyConfigurationAttribute("Release")]
[assembly: System.Reflection.AssemblyFileVersionAttribute("1.0.0.0")]
[assembly: System.Reflection.AssemblyInformationalVersionAttribute("1.0.0")]
[assembly: System.Reflection.AssemblyProductAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyTitleAttribute("web_selenium")]
[assembly: System.Reflection.AssemblyVersionAttribute("1.0.0.0")]


[assembly: System.Reflection.AssemblyCompanyAttribute("tests_project")]
[assembly: System.Reflection.AssemblyConfigurationAttribute("Release")]
[assembly: System.Reflection.AssemblyFileVersionAttribute("1.0.0.0")]
[assembly: System.Reflection.AssemblyInformationalVersionAttribute("1.0.0")]
[assembly: System.Reflection.AssemblyProductAttribute("tests_project")]
[assembly: System.Reflection.AssemblyTitleAttribute("tests_project")]
[assembly: System.Reflection.AssemblyVersionAttribute("1.0.0.0")]